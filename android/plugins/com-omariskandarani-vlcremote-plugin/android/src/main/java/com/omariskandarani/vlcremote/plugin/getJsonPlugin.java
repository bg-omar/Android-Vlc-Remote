package com.omariskandarani.vlcremote.plugin;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "getJson")
public class getJsonPlugin extends Plugin {

    private getJson implementation = new getJson();

    @PluginMethod
    public void echo(PluginCall call) {
        String pass = call.getString("pass", "");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(pass));
        call.resolve(ret);
    }
}
