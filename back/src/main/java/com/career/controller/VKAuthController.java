package com.career.controller;

import com.career.utils.JsonGetMapping;
import com.github.scribejava.apis.VkontakteApi;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Random;
import java.util.concurrent.ExecutionException;

@Controller
@RequestMapping("/api/vk")
public class VKAuthController {

    @Value("${org.genfork.vkontakte.clientId}")
    private String clientId;
    @Value("${org.genfork.vkontakte.clientSecret}")
    private String clientSecret;
    @Value("${org.genfork.vkontakte.callbackUri}")
    private String redirectCallBackUri;
    @Value("${org.genfork.vkontakte.scope}")
    private String scope;
    @Value("${org.genfork.vkontakte.userProfileUri}")
    private String userProfileUri;

    //private static final Token EMPTY_TOKEN = null;


    @JsonGetMapping(value = "/signin")
    public void vkLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String secretState = "secret" + new Random().nextInt(999_999);
        request.getSession().setAttribute("SECRET_STATE", secretState);

        final OAuth20Service service = new ServiceBuilder(clientId)
                .apiSecret(clientSecret)
                .callback(redirectCallBackUri)
                .build(VkontakteApi.instance());

        final String redirectURL = service.getAuthorizationUrl();
        response.sendRedirect(redirectURL);
    }

    @JsonGetMapping(value = "/callback")
    public String callback(@RequestParam(value = "code", required = false) String code
                          // @RequestParam(value = "state", required = false) String state,
                           ) throws IOException, ExecutionException, InterruptedException {

        final OAuth20Service service = new ServiceBuilder(clientId)
                .apiSecret(clientSecret)
                .callback(redirectCallBackUri)
                .build(VkontakteApi.instance());

        final OAuth2AccessToken accessToken = service.getAccessToken(code);

        final OAuthRequest oauthRequest = new OAuthRequest(Verb.GET, userProfileUri);
        service.signRequest(accessToken, oauthRequest);

        final Response response = service.execute(oauthRequest);

        System.out.println(response.getBody());
        System.out.println(response.getCode());

//        final JSONObject obj = new JSONObject(resourceResponse.getBody());
////
////        final String userId = obj.getString("uid");
////        final String first_name = obj.getString("first_name");
////        final String last_name = obj.getString("last_name");
////
////        if (userService.findOne(Long.parseLong(userId)) != null) {
////            request.getSession().setAttribute("VK_ACCESS_TOKEN", accessToken);
////            model.addAttribute("user", userService.findOne(Long.parseLong(userId)));
////            final Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
////            if (user instanceof User) {
////                return "account";
////            } else {
////                return "/personalarea";
////            }
////        } else {
////            final User user = new User();
////            user.setFirst_name(first_name);
////            user.setLast_name(last_name);
////            model.addAttribute("user", user);
////            return "/registration";
////        }
        return "";
    }
}