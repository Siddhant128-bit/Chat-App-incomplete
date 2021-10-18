import { StatusBar } from 'expo-status-bar';
import React, {Component, useEffect,useState} from 'react';
import {Button,StyleSheet, BackHandler,Text,Image,View,TouchableOpacity,TextInput,Clipboard,Dimensions,ImageBackground,TouchableHighlight,ScrollView} from 'react-native';
import {NavigationContainer,DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { SliderBox } from "react-native-image-slider-box";
import firebase from 'firebase';


const Stack=createStackNavigator();

//can't back with pressing back in hardware code is the chunk below use it later
/*
useEffect(() => {
BackHandler.addEventListener('hardwareBackPress', () => true)
return () =>
  BackHandler.removeEventListener('hardwareBackPress', () => true)
}, [])
*/


function verification(username,password,navigation)
{
  username=username.toLowerCase();
  password=password.toLowerCase();
  const dbRef = firebase.database().ref();
  dbRef.child("users").child(username).get().then((snapshot) =>
  {
    if (snapshot.exists())
    {
      var password_value=snapshot.child('password').val();
      var name_value=snapshot.child('name').val();
      var number_value=snapshot.child('number').val();
      password_value=password_value.toLowerCase();
      if(password_value==password)
      {
        alert('Welcome '+name_value+' To Bola Suna');
        navigation.navigate('Profile',{name_value,number_value,username})
      }
      else {
        alert('Wrong Credentials')
        navigation.navigate('Bola-Suna')
      }
    }
    else
    {
      alert('Wrong Credentials !!')

    }
  }).catch((error) => {
    console.error(error);
  });
}

function upload_image()
{
  console.log("Here to upload image");
}

function register(name,number,username,password,navigation)
{

  username=username.toLowerCase();
  const dbRef = firebase.database().ref(); //getting the reference fromt his we get further details
  //get the child of users with username value if exists then already existing one if not doesn't exists.
  dbRef.child("users").child(username).get().then((snapshot) => {
    if (snapshot.exists())
    {
      alert('Already Registed User')
    }
    else if(number_val==number)
    {
      alert('Already Registed User')
    }
    else
    {
      //console.log(name,number,username,password)
      firebase.database().ref('users/'+username).set(
        {
          name: name,
          number: number,
          password: password
        }
      ).then(()=>{
        console.log("Successful")
      }).catch((error)=>{
        console.log('error')
      });
      alert('Registed Sucessfully')
    }
  }).catch((error) => {
    console.error(error);
  });
}

// profile for creating room and all i think.
const profile=({route,navigation})=>
{
  const informations=route.params;
  //cannot use back to go back to Main page.
  useEffect(() => {
  BackHandler.addEventListener('hardwareBackPress', () => true)
  return () =>
    BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])

  return(
    <View style={body_styles.container}>
      <TouchableOpacity
        style = {{
          width: Dimensions.get('window').width * 1.5,
          height: Dimensions.get('window').width * .45,
          backgroundColor:'#0d0',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#ccc'>
        <Text style={{marginTop:30,fontSize:40,alignItems:'center',color:'#000'}}>{informations.name_value} </Text>
        <Text style={{marginTop:10, marginLeft:-150, fontSize:15,alignItems:'center',color:'#000'}}>username: {informations.username} </Text>
        <Text style={{marginTop:10, marginLeft:-110, fontSize:15,alignItems:'center',color:'#000'}}>contact number: {informations.number_value} </Text>
      </TouchableOpacity>

      <TouchableOpacity  onPress={()=>navigation.navigate('Bola-Suna')}
        style = {{
          marginTop:Dimensions.get('window').height*0.5,
          width: Dimensions.get('window').width * 1.5,
          height: Dimensions.get('window').height * .15,
          backgroundColor:'#0d0',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#fff'>
        <Text style={{marginTop:30,fontSize:15,alignItems:'center',color:'#000'}}> Logout </Text>
      </TouchableOpacity>
    </View>
  )
}

//Signup window to let us signup and register as user
const sign_up=({navigation})=>
{
  var name='';
  var username='';
  var password='';
  var number='';
  return(
    <ScrollView style={{backgroundColor: '#fff',flex:1}}>
    <View style={{backgroundColor:'#fff',flex:1}}>
      <Image source={require('./assets/logo.png')} style={{marginTop:-50,width: 300, height: 300, borderRadius: 150/2}}/>
        <TextInput style={{width:300,height:50,borderWidth:1,marginTop:-50,marginLeft:30,borderRadius:10,textAlign: 'center'}} placeholder='Name'  multiline={false} onChangeText={(text)=>name=text}/>
        <TextInput style={{width:300,height:50,borderWidth:1,width:180,height:50,borderWidth:1,marginTop:20,marginLeft:30,borderRadius:10,textAlign: 'center'}} placeholder='Contact Number'  multiline={false} onChangeText={(text)=>number=text}/>
        <TextInput style={{width:300,height:50,borderWidth:1,width:180,height:50,borderWidth:1,marginTop:20,marginLeft:30,borderRadius:10,textAlign: 'center'}} placeholder='Username'  multiline={false} onChangeText={(text)=>username=text}/>
        <TextInput style={{width:300,height:50,borderWidth:1,width:180,height:50,borderWidth:1,marginTop:20,marginLeft:30,borderRadius:10,textAlign: 'center'}} placeholder='Password'  secureTextEntry={false} multiline={false} onChangeText={(text)=>password=text}/>
        <TouchableOpacity onPress={()=>{upload_image()}} style={{width:140,height:140,marginTop:-160,
            marginLeft:Dimensions.get('window').width * .60,borderWidth:1,backgroundColor:'#eee'}}>
            <Image source={require('./assets/add_image.png')}style={{width: 138, height: 138}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{register(name,number,username,password,navigation);}} style={body_styles.Button_container_SignUp_final}>
            <Text style={body_styles.text_container}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Bola-Suna')} style={body_styles.Button_container_Back_final}>
            <Text style={body_styles.text_container}>Back</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
}


//Signin window to let us signin to the user.
const sign_in=({navigation})=>{
  var username='';
  var password='';
  return(
    <ScrollView style={{backgroundColor: '#fff',flex:1}}>
      <View style={{backgroundColor:'#fff',flex:1}}>
        <Image source={require('./assets/logo.png')} style={{marginLeft:-15,marginTop:150, width: 200, height: 200, borderRadius: 150/2}}/>
        <TextInput style={{width:180,height:50,borderWidth:1,marginTop:-150,marginLeft:180,borderRadius:10,textAlign: 'center'}} placeholder='Username'  multiline={false} onChangeText={(text)=>username=text}/>
        <TextInput style={{width:180,height:50,borderWidth:1,marginTop:20,marginLeft:180,borderRadius:10,textAlign: 'center'}} placeholder='Password'  secureTextEntry={true} multiline={false} onChangeText={(text)=>password=text}/>
        <TouchableOpacity onPress={()=>{verification(username,password,navigation);}} style={body_styles.Button_container_SignIn_final}>
            <Text style={body_styles.text_container}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Bola-Suna')} style={body_styles.Button_container_Back_SignIn_final}>
            <Text style={body_styles.text_container}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


// This is for the main menu page containing the basic three buttons of sign in create account and also quit.
const main_menu=({navigation})=>{
  images=[

    require('./assets/image1.png'),
    require('./assets/image2.png'),
    require('./assets/image3.png'),
  ]
  return(
    //always return the structure and layout of the
    <View style={body_styles.container}>
      <Image source={require('./assets/logo.png')} style={{position:'absolute',top:0,width: 200, height: 200, borderRadius: 150/2}}/>
      <SliderBox
        images={images}
        style={{position:'absolute',top: Dimensions.get('window').height/4, left: Dimensions.get('window').width/4,height:200,width:200}}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}  
        dotColor="#0d0"  
        inactiveDotColor="#ddd"
        paginationBoxVerticalPadding={20}
        paginationBoxStyle={{
          position: 'absolute',
          bottom: 250,
          padding: 0,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          paddingVertical: 10
        }}
        dotStyle={{
           width: 15,
           height: 15,
           borderRadius: 15,
           marginHorizontal:5,
           backgroundColor: 'rgba(128, 128, 128, 0.92)'

         }}
        />
      <StatusBar style="auto" />

      <TouchableHighlight
        style = {{
          position:'absolute',
          left:-150,
          top:-100,
          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
          width: Dimensions.get('window').width * .65,
          height: Dimensions.get('window').width * .65,
          backgroundColor:'#0d0',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#ccc'
      >
        <Text> </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style = {{
          position:'absolute',
          left:50,
          top:-200,
          width: Dimensions.get('window').width * 1.5,
          height: Dimensions.get('window').width * .65,
          backgroundColor:'#0d0',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#ccc'
      >
        <Text> </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style = {{
          position:'absolute',
          left:Dimensions.get('window').width-110,
          top: Dimensions.get('window').height-200,
          borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
          width: Dimensions.get('window').width * .65,
          height: Dimensions.get('window').width * .65,
          backgroundColor:'#0d0',
          borderColor:'#0d0',
          borderWidth:5,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#ccc'
      >
        <Text> </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style = {{
          position:'absolute',
          left:-50,
          top:Dimensions.get('window').height-100,
          width: Dimensions.get('window').width * 1.5,
          height: Dimensions.get('window').width * .65,
          backgroundColor:'#0d0',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        underlayColor = '#ccc'
      >
        <Text> </Text>
      </TouchableHighlight>

      <TouchableOpacity onPress={()=>navigation.navigate('Log in')} style={body_styles.Button_container_SignIn}>
          <Text style={body_styles.text_container}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Sign up')} style={body_styles.Button_container_SignUp}>
          <Text style={body_styles.text_container}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>BackHandler.exitApp()} style={body_styles.Button_container_Quit}>
          <Text style={body_styles.text_container}>Quit</Text>
      </TouchableOpacity>
    </View>
  );
}

//here is the main content of the app it should direct to all the other navigation tabs and so n.
export default function App(){

  var firebaseConfig = {
    apiKey: "AIzaSyAUHZze0G8QduE4D3DOaGiLpp7Bif4XX5Y",
    authDomain: "bola-suna.firebaseapp.com",
    databaseURL: "https://bola-suna-default-rtdb.firebaseio.com",
    projectId: "bola-suna",
    storageBucket: "bola-suna.appspot.com",
    messagingSenderId: "67749978749",
    appId: "1:67749978749:web:26eb7a01a55ee63c520714",
    measurementId: "G-3154VPV6SG"
  };
  // Initialize Firebase
  //firebase.initializeApp(firebaseConfig);
  //to testing for refresh uncomment the buttom chunk of code

  if (!firebase.apps.length)
  {
    firebase.initializeApp({firebaseConfig});
  }
  else
  {
    firebase.app(); // if already initialized, use that one
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Bola-Suna' component={main_menu} options={{headerLeft: () => null}} />
        <Stack.Screen name='Log in' component={sign_in} options={{headerLeft: () => null}}/>
        <Stack.Screen name='Sign up' component={sign_up} options={{headerLeft: () => null}}/>
        <Stack.Screen name='Profile' component={profile} options={{headerLeft: () => null}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


//here goes all the styling of elements.
const body_styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  Button_container_SignIn:{
    position:'absolute',
    top: Dimensions.get('window').height-300,
    alignItems: 'center',
    backgroundColor: "#0d0", //#RGB Format
    borderWidth:1,
    borderRadius: 20,
    width: 100,
    height: 50,
  },
  Button_container_SignUp:{
    position:'absolute',
    top: Dimensions.get('window').height-(180+50),
    alignItems: 'center',
    backgroundColor: "#0d0", //#RGB Format
    borderWidth:1,
    borderRadius: 20,
    width: 100,
    height: 50,
  },
  Button_container_SignIn_final:{
    marginTop:20,
    marginLeft:200,
    alignItems: 'center',
    backgroundColor: "#0d0", //#RGB Format
    borderWidth:1,
    borderRadius: 20,
    width: 150,
    height: 50,
  },
  Button_container_Back_SignIn_final:{
    marginTop:20,
    marginLeft:200,
    alignItems: 'center',
    backgroundColor: "#0d0", //#RGB Format
    borderWidth:1,
    borderRadius: 20,
    width: 150,
    height: 50,
  },

  Button_container_SignUp_final:{
    marginTop:40,
    marginLeft:30,
    alignItems: 'center',
    backgroundColor: "#0d0", //#RGB Format
    borderWidth:1,
    borderRadius: 20,
    width: 150,
    height: 50,
  },
  Button_container_Back_final:{
    marginTop:20,
    marginLeft:30,
    alignItems: 'center',
    backgroundColor: "#0d0", //#RGB Format
    borderWidth:1,
    borderRadius: 20,
    width: 150,
    height: 50,
  },
  Button_container_Quit:{
    position:'absolute',
    top: Dimensions.get('window').height-(110+50),
    alignItems: 'center',
    backgroundColor: "#f00", //#RGB Format
    borderWidth:1,
    borderRadius: 20,
    width: 100,
    height: 50,
  },
  text_container:{
    alignItems:'center',
    top: 10,
    color:'#fff'
  },

});
