package com.omariskandarani.vlcremote;
import androidx.preference.PreferenceManager;
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

import com.getcapacitor.PreferenceManager;
import org.json.JSONException;
import org.json.JSONObject;


public class MainActivity extends BridgeActivity {

  PreferenceManager preferenceManager = PreferenceManager.getInstance();
  String jsonData = preferenceManager.get("jsonData", "");
  JSONObject jsonObject = new JSONObject(jsonData);
  String name = jsonObject.getString("name");
  int age = jsonObject.getInt("age");
  boolean isMarried = jsonObject.getBoolean("isMarried");
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Enable cookies
    CookieManager.getInstance().setAcceptCookie(true);

    // Get WebView settings
    WebView webView = this.getBridge().getWebView();
    webView.setWebViewClient(new BridgeWebViewClient(bridge){
      @Override
      public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler, String host, String realm) {
        try {
          // Read the JSON file
          InputStream inputStream = getAssets().open("public/assets/data/data.json");
          InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
          BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
          StringBuilder stringBuilder = new StringBuilder();
          String line;
          while ((line = bufferedReader.readLine())!= null) {
            stringBuilder.append(line);
          }
          String json = stringBuilder.toString();

          // Pass the JSON string as the first argument to the proceed method
          handler.proceed("", "1z2x");
        } catch (IOException e) {
          e.printStackTrace();
        }
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
