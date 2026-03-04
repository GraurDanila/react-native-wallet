import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Stack } from "expo-router";

export default function Layout() {
    const { isSignedIn } = useUser();

if (!isSignedIn) return <Redirect href={'/signed-in'} />;

        return <Stack screenOptions={{ headerShown: flase}} />;
}