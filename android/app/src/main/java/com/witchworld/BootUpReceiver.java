package com.witchworld;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootUpReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
    if(intent.getAction() == Intent.ACTION_BOOT_COMPLETED){
            context.startForegroundService(new Intent(context, WitchWorldService.class));
    }
    if(intent.getAction() == Intent.ACTION_USER_PRESENT){
            context.startForegroundService(new Intent(context, WitchWorldService.class));
    }
}}