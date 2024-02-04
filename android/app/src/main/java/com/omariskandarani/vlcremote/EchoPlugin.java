package com.omariskandarani.vlcremote;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "Echo")
public class EchoPlugin extends Plugin {

  @PluginMethod()
  public void echo(PluginCall call) {
    String value = call.getString("value");

    JSObject ret = new JSObject();
    ret.put("value", value);
    call.resolve(ret);
  }

  @PluginMethod()
  public void storeContact(PluginCall call) {
    String name = call.getString("yourName", "default name");
    JSObject address = call.getObject("address", new JSObject());
    boolean isAwesome = Boolean.TRUE.equals(call.getBoolean("isAwesome", false));

    if (!call.getData().has("id")) {
      call.reject("Must provide an id");
      return;
    }

    call.resolve();
  }
}
