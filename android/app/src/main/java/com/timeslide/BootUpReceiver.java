package com.timeslide;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootUpReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
    if(intent.getAction() == Intent.ACTION_BOOT_COMPLETED){
            context.startForegroundService(new Intent(context, TimeSlideService.class));
    }
    if(intent.getAction() == Intent.ACTION_USER_PRESENT){
            context.startForegroundService(new Intent(context, TimeSlideService.class));
    }
}}