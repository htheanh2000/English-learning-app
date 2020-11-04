package com.timeslide;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import android.os.Build;
import android.content.IntentFilter;

import android.util.Log;
import com.facebook.react.HeadlessJsTaskService;

public class TimeSlideService extends Service {
    private String TAG = "TimeSlideService";
    public static boolean isServiceRunning;
    private static final int SERVICE_NOTIFICATION_ID = 12345;
    private static final String CHANNEL_ID = "TimeSlide";
    private ScreenLockReceiver screenLockReceiver;

     public TimeSlideService() {
        isServiceRunning = false;
        screenLockReceiver = new ScreenLockReceiver();
    }

    private Handler handler = new Handler();
    private Runnable runnableCode = new Runnable() {
        @Override
        public void run() {
            Context context = getApplicationContext();
            Intent myIntent = new Intent(context, TimeSlideEventService.class);
            context.startService(myIntent);
            HeadlessJsTaskService.acquireWakeLockNow(context);
            handler.postDelayed(this, 2000);
        }
    };
    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "TimeSlide", importance);
            channel.setDescription("CHANEL DESCRIPTION");
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        // }
    }
   
     
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "onCreate called");
        isServiceRunning = true;
        // register receiver to listen for screen on events
        IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
        filter.addAction(Intent.ACTION_USER_PRESENT);
        filter.addAction(Intent.ACTION_SCREEN_OFF);
        registerReceiver(screenLockReceiver, filter);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        isServiceRunning = false;
        stopForeground(true);
        unregisterReceiver(screenLockReceiver);
        Log.d(TAG, "unregisterReceiver called");
   
    }
   
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        this.handler.post(this.runnableCode); // Starting the interval
        // Turning into a foreground service
        
        createNotificationChannel(); // Creating channel for API 26+
        Intent notificationIntent = new Intent(this, MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("TimeSlide service")
            .setContentText("Running…")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentIntent(contentIntent)
            .setOngoing(true)
            .build();
            startForeground(SERVICE_NOTIFICATION_ID, notification);
            return START_STICKY;
    }
}
