import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { getLiveWasteData } from '@/lib/api';
import { MapPin, Utensils, Library, Building, GraduationCap, AlertTriangle } from 'lucide-react';

const getZoneIcon = (zoneName) => {
  const name = (zoneName || '').toLowerCase();
  if (name.includes('cafeteria') || name.includes('canteen') || name.includes('mess')) {
    return <Utensils className="h-5 w-5 text-muted-foreground" />;
  }
  if (name.includes('library')) {
    return <Library className="h-5 w-5 text-muted-foreground" />;
  }
  if (name.includes('hostel') || name.includes('dorm')) {
    return <Building className="h-5 w-5 text-muted-foreground" />;
  }
  if (name.includes('class') || name.includes('academic') || name.includes('lecture')) {
    return <GraduationCap className="h-5 w-5 text-muted-foreground" />;
  }
  return <MapPin className="h-5 w-5 text-muted-foreground" />;
};

const WasteDashboard = () => {
  const [wasteData, setWasteData] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};

    const setupLiveSubscription = async () => {
      const result = await getLiveWasteData(setWasteData);
      unsubscribe = result.unsubscribe;
    };

    setupLiveSubscription();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Live Waste Monitoring</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wasteData.map((zone) => {
          const level = Math.min(Math.max(zone.latest_waste_level || 0, 0), 100);
          
          let colorClass = 'bg-green-500';
          if (level >= 50 && level <= 80) colorClass = 'bg-yellow-500';
          else if (level > 80) colorClass = 'bg-red-500';

          return (
            <Card key={zone.id} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  {zone.name}
                </CardTitle>
                {getZoneIcon(zone.name)}
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold">{Math.round(level)}%</div>
                  {level > 80 && (
                    <Badge variant="destructive" className="flex items-center gap-1 shadow-sm">
                      <AlertTriangle className="h-3 w-3" />
                      <span>High Risk</span>
                    </Badge>
                  )}
                </div>
                <Progress 
                  value={level} 
                  className="h-2" 
                  indicatorColor={colorClass} 
                />
                <p className="text-xs text-muted-foreground mt-3 text-right">
                  {zone.latest_at 
                    ? `Updated ${new Date(zone.latest_at).toLocaleTimeString()}`
                    : 'Awaiting data...'}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {wasteData.length === 0 && (
        <div className="text-center text-muted-foreground py-12 border border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
          <p>Loading waste data...</p>
        </div>
      )}
    </div>
  );
};

export default WasteDashboard;
