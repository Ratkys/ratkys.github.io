<?php
   

    session_cache_limiter( 'nocache' );
    header( 'Expires: ' . gmdate( 'r', 0 ) );
    header( 'Content-type: application/json' );


    $to         = 'ratkys@my.com';  // put your email here

    $email_template = 'simple.html';

    $subject    = strip_tags($_POST['subject']);
    $name       = strip_tags($_POST['name']);
    $email       = strip_tags($_POST['email']);
    // $phone      = strip_tags($_POST['phone']);   
    $message    = nl2br( htmlspecialchars($_POST['message'], ENT_QUOTES) );
    $result     = array();


    if(empty($name)){

        $result = array( 'response' => 'error', 'empty'=>'name', 'message'=>'<strong>Ошибка!</strong>&nbsp; Заполните поле' );
        echo json_encode($result );
        die;
    } 

    if(empty($email)){

        $result = array( 'response' => 'error', 'empty'=>'email', 'message'=>'<strong>Ошибка!</strong>&nbsp; Заполните поле' );
        echo json_encode($result );
        die;
    } 

    if(empty($message)){

         $result = array( 'response' => 'error', 'empty'=>'message', 'message'=>'<strong>Ошибка!</strong>&nbsp; Заполните поле' );
         echo json_encode($result );
         die;
    }
    


    $headers  = "From: " . $name . ' <' . $email . '>' . "\r\n";
    $headers .= "Reply-To: ". $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";


    $templateTags =  array(
        '{{subject}}' => $subject,
        '{{name}}'=>$name,
        '{{email}}'=>$email,
        '{{message}}'=>$message        
        // '{{phone}}'=>$phone
        );


    $templateContents = file_get_contents( dirname(__FILE__) . '/email-templates/'.$email_template);

    $contents =  strtr($templateContents, $templateTags);

    if ( mail( $to, $subject, $contents, $headers ) ) {
        $result = array( 'response' => 'success', 'message'=>'<strong>Спасибо!</strong>&nbsp; Ваше сообщение было оправлено.' );
    } else {
        $result = array( 'response' => 'error', 'message'=>'<strong>Ошибка!</strong>&nbsp; Сообщение не отправлено.'  );
    }

    echo json_encode( $result );

    die;