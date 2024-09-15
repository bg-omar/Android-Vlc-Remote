package com.omariskandarani.vlcremote;
import com.omariskandarani.vlcremote.plugin.*;
import android.content.SharedPreferences;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;


import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.HttpAuthHandler;


import android.webkit.WebView;


public class MainActivity extends BridgeActivity {

    @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.registerPlugin(getJsonPlugin.class);
    this.registerPlugin(SharedPrefsPlugin.class);
    // Initialize the plugin
    getBridge().getPlugin(String.valueOf(getJsonPlugin.class));
    getBridge().getPlugin(String.valueOf(SharedPrefsPlugin.class));

    // Enable cookies
    CookieManager.getInstance().setAcceptCookie(true);

    // Get WebView settings
    WebView webView = this.getBridge().getWebView();

    webView.setWebViewClient(new BridgeWebViewClient(bridge){
      @Override
      public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler, String host, String realm) {

        // Access SharedPreferences
        SharedPreferences sharedPreferences = getSharedPreferences("MyPreferences", MODE_PRIVATE);
        String passValue = sharedPreferences.getString("pass", "pass not fetched");

        // Print or use the retrieved value
        System.out.println("Pass value from SharedPreferences: " + passValue);

          handler.proceed("", passValue);

      }
    });
    WebSettings webSettings = webView.getSettings();

    // Enable JavaScript (if needed)
    webSettings.setJavaScriptEnabled(true);




  }
}
