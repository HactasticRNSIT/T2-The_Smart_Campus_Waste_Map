import { supabase } from './supabase'

export async function getLiveWasteData(setWasteData) {
  // Fetch all zones
  const { data: zones, error: zonesError } = await supabase.from('campus_zones').select('*')
  if (zonesError) {
    console.error('Error fetching campus_zones', zonesError)
    setWasteData([])
    return { unsubscribe: () => {} }
  }

  // For each zone fetch the latest waste_log entry
  const combined = await Promise.all(
    zones.map(async (zone) => {
      const { data: logs, error } = await supabase
        .from('waste_logs')
        .select('waste_level,created_at')
        .eq('zone_id', zone.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (error) console.error('Error fetching waste_logs for zone', zone.id, error)

      const latest = logs && logs[0] ? logs[0] : null
      return {
        id: zone.id,
        name: zone.name ?? zone.title ?? `Zone ${zone.id}`,
        latest_waste_level: latest ? latest.waste_level : null,
        latest_at: latest ? latest.created_at : null,
      }
    })
  )

  setWasteData(combined)

  // Set up realtime listener to update state when waste_logs change
  const subscription = supabase
    .channel('waste-logs-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'waste_logs' },
      (payload) => {
        const record = payload.new ?? payload


        setWasteData((prev) => {
          const found = prev.find((p) => p.id === record.zone_id)
          if (found) {
            const existingTime = found.latest_at ? new Date(found.latest_at).getTime() : 0
            const recordTime = record.created_at ? new Date(record.created_at).getTime() : Date.now()
            // update if the incoming record is newer or same
            if (recordTime >= existingTime) {
              return prev.map((p) =>
                p.id === record.zone_id
                  ? { ...p, latest_waste_level: record.waste_level, latest_at: record.created_at }
                  : p
              )
            }
            return prev
          }

          // zone not found in current state: fetch zone meta and append
          ;(async () => {
            try {
              const { data: zoneData } = await supabase.from('campus_zones').select('*').eq('id', record.zone_id).limit(1)
              const zone = Array.isArray(zoneData) ? zoneData[0] : zoneData
              setWasteData((prev2) => [
                ...prev2,
                {
                  id: record.zone_id,
                  name: zone?.name ?? `Zone ${record.zone_id}`,
                  latest_waste_level: record.waste_level,
                  latest_at: record.created_at,
                },
              ])
            } catch (e) {
              console.error('Error fetching zone metadata', e)
            }
          })()

          return prev
        })
      }
    )
    .subscribe()

  const unsubscribe = () => {
    try {
      if (subscription?.unsubscribe) subscription.unsubscribe()
      else if (supabase.removeSubscription) supabase.removeSubscription(subscription)
    } catch (err) {
      console.warn('Error unsubscribing realtime', err)
    }
  }

  return { unsubscribe }
}

export default getLiveWasteData
