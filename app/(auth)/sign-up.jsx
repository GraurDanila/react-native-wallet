import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router'

export default function SignUp() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState('');

    // Handle submission of the sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // sign-up with email and password
        try{
            await signUp.create({
                emailAddress,
                password,
            });

            //Send the verification email
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        
            //set "pendingVerification", true, to display second form
            // capture OTP code
            setPendingVerification(true);
        } catch (err) {
            // see clerk link
            //  for more info
            console.error(JSON.stringify(err, null, 2));
        }
    }

    //Handle OTP code
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // use code for verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            // if sucesful, session is active
            // redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace('/')
        } else {
            // if the status is not active
            // the user must to do other steps
            console.error(JSON.stringify(signUpAttempt, null, 2));
        }
    } catch (err) {
        // see clerk link
        // for more info
        console.error(JSON.stringify(err, null, 2));
    }
}

 if (pendingVerification) {
    return (
        <>
        <Text>Verify your email</Text>
        <TextInput
        value={code}
        placeholder="Enter your verification code"
        onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
        <Text>Verify</Text>
        </TouchableOpacity>
        </>
    )
 }

 return (
    <View>
        <>
         <Text>Sign Up</Text>
         <TextInput
           autoCapitalize="none"
           value={emailAddress}
           placeholder="Enter email"
           onChangeText={(email) => setEmailAddress(email)}
            />
            <TextInput
            value={password}
            placeholder="Enter password"
            secureTextEntry={true}
            onhangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity onPress={onSignUpPress}>
            <Text>Continue</Text>
            </TouchableOpacity>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
            <Text>Already have an account</Text>
            <Link href="/sign-in">
            <Text>Sign in</Text>
            </Link>
            </View>
        </>
    </View>
 );
}