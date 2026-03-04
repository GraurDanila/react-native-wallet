import { UseClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity } from 'react-native'  

export const SignOutButton = () => {
    // use clerk to make signout function
    const { signOut } = useClerk()
    const handleSignOut = async () => {
        try {
            await signOut()
            // redirect to the first page
            Linking.openURL(Linking.createURL('/'))
        } catch (err) {
            //see clerk link
            //for more info
            console.error(JSON.stringify(err, null, 2))
        }
    }
    return (
        <TouchableOpacity onPress={handleSignOut}>
            <Text>Sign out</Text>
        </TouchableOpacity>
    )
}