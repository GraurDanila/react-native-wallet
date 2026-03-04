import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the sign-in submission
  const onSignInPress = async () => {
    if (!isLoaded) return

    // SignIn start process using the email and password
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // if sign-in is succesful session si active
      // redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/')
      } else {
        // if the user needs other steps redirect him to the sign-in page
        // to complete the sign-in process
        console.error(JSON.stringify(err, null, 2));
      }
  } catch (err) {
    //see clerk link
    // for more info
    console.error(JSON.stringify(err, null, 2));
   }
  }

  return (
    <View>
      <Text>Sign In</Text>
      <TextInput
      autoCapitalize="none"
      value={emailAddress}
      palceholder="Enter email"
      onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
      value={password}
      palceholder="Enter password"
      secureTextEntry={true}
      onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity onPress={onSignInPress}>
        <Text>Continue</Text>
      </TouchableOpacity>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Link href="/sign-up">
         <Text>Sign Up</Text>
         </Link>
      </View>
    </View>
  );
}