package com.witchworld;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class ScreenLockReceiver extends BroadcastReceiver {
    private String TAG = "ScreenLockReceiver";
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        
        if (action.equals(Intent.ACTION_SCREEN_ON)) {
             Log.d(TAG, "onReceive called: screen on");
            Intent i = new Intent(context, MainActivity.class);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            i.putExtra("alarmID", "1111111");
            context.startActivity(i);
        } 
        else if (action.equals(Intent.ACTION_SCREEN_OFF)) 
        {

        } 

        else if (action.equals(Intent.ACTION_USER_PRESENT)) {
            Log.d(TAG, "onReceive called: screen unlocked");
         Intent i = new Intent(context, MainActivity.class);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            i.putExtra("alarmID", 1111111);
            context.startActivity(i);
        }

        
    }

    // ScreenReceiver screen;
        // Context context=null;
        // @Override
        //     public void onReceive(Context context, Intent intent) {
        //     if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
        //         Log.d(TAG, "onReceive called: screen on");
        //         Intent i = new Intent(context, MainActivity.class);
        //         i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        //         context.startActivity(i);
        //     }
        // }
}