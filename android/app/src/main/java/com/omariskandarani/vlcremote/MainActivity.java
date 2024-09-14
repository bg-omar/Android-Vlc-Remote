package com.omariskandarani.vlcremote;
import com.omariskandarani.vlcremote.plugin.*;
import android.content.SharedPreferences;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebSettings;
import android.webkit.HttpAuthHandler;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.InputStream;

import android.webkit.WebView;


public class MainActivity extends BridgeActivity {

    @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

      // Initialize the plugin
      getBridge().getPlugin(String.valueOf(getJsonPlugin.class));

    // Enable cookies
    CookieManager.getInstance().setAcceptCookie(true);

    // Get WebView settings
    WebView webView = this.getBridge().getWebView();
    webView.setWebViewClient(new WebViewClient(bridge){
      @Override
      public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler, String host, String realm) {

          SharedPreferences sharedPreferences = getSharedPreferences("pass", MODE_PRIVATE);
          String value = sharedPreferences.getString("pass", "pass not fetched");
          System.out.print(": -------------------------------------> ");
          System.out.println(value);

          handler.proceed("", "1z2x");

      }
    });
    WebSettings webSettings = webView.getSettings();

    // Enable JavaScript (if needed)
    webSettings.setJavaScriptEnabled(true);

    registerPlugin(EchoPlugin.class);


  }


  public void onresume() {
    super.onResume();
    WebView webview = this.getBridge().getWebView();
    webview.setWebViewClient(new BridgeWebViewClient(bridge){
      @Override
      public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler, String host, String realm) {
        handler.proceed("", "1z2x");
      }
    });
  }
}
