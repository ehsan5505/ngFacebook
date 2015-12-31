'use strict'

angular.module('ess.facebook',['ngRoute','ngFacebook'])
.config(['$routeProvider',function($routeProvider){
    $routeProvider
    .when('/facebook',{
        templateUrl:"facebook/facebook.html",
        controller: 'facebookCntr'
    })
}])

.config(function($facebookProvider){
    $facebookProvider.setAppId('1652743445000125');
    // set permission
    $facebookProvider.setPermissions('user_posts','email','public_profile','user_photos','public_actions','user_posts');
    // $facebookProvider.setPermissions("user_posts","email","user_likes","public_profile","user_photos");
    // $facebookProvider.setVersion("v2.2");
    
    
})

.run(function($rootScope){
    
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
})

.controller('facebookCntr',['$scope','$facebook',function($scope,$facebook){
    $scope.islogin = false;
    $scope.login = function(){
        $facebook.login().then(function(){
            console.log("Login Successfully");
            $scope.islogin = true;
            refresh();
        })
    }
    $scope.logout = function(){
        $facebook.logout().then(function(){
            console.log("Logout the account");
            $scope.islogin = false;
            refresh();
        })
    }
    
    
    function refresh(){
        $facebook.api('/me').then(function(res){
            $scope.islogin = true;
            $scope.welcomeMsg = res.name;
            $scope.userProfile = res;
            console.log(res);
            $facebook.api('/me/picture').then(function(pic){
                $scope.image = pic.data.url;
                // console.info($scope.image);
            });
            $facebook.api('/me/permissions').then(function(permit){
                $scope.permissions = permit.data;
                console.info(permit.data);
                
                $facebook.api("/me/posts").then(function(postman){
                    console.warn(postman);
                    $scope.postman = postman;
                })
            });
        },function(err){
            console.warn(err);
            $scope.islogin = false;
            $scope.welcomeMsg = "Please Login";
        })
    }
    
    $scope.postFeed = function(){
        // console.log(this.body);
        var body = this.body;
        
        $facebook.api(
            "/me/feed",
            "POST",
            {
                "message": "This is a test message"
            },
            function (response) {
              if (response && !response.error) {
                console.log(response);
                $scope.msg = "Thanks for message";
                refresh();
              }
            }
        );
        // $facebook.api('/me/feed','post', {message: body},function(response){
        //     $scope.msg = "Thanks for posting!";
        //     refresh();
            // console.log(body);
        // });
    }
        
    // function refresh(){
    //     // var log;
    //     // $facebook.getLoginStatus().then(function($$state){
    //     //     log = $$state;
    //     // });
    //     // var loge = ;
    //     // var log = loge.$$state.status;
    //     // console.info(log);
    //     // $scope.islogin = log!=null ? false : true ;  
    //     if($scope.islogin){
    //         $facebook.api('/me').then(function(data){
    //             $scope.welcomeMsg = "Welcome "+data.name;
    //             $scope.profile = data;
    //             console.log(data);
    //         })
    //     }else{
    //         $scope.welcomeMsg = "Please Log In";
    //     }
    // }
    
    //refresh content
    refresh();
    
}])
