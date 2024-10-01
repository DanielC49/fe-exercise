import { createContext, ReactNode, useEffect, useState } from "react";

interface ProfileContextType {
    profile: Profile | null;
    loading: boolean;
}

export interface Profile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
};

export const ProfileContext = createContext<ProfileContextType>({
    profile: null,
    loading: true
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const accountId = localStorage.getItem("accountId");
        if (accountId) {
            fetch(`http://localhost:5000/users?id=${accountId}`).then(res => res.json()).then((accounts: Array<any>) => {
                if (accounts.length == 1) {
                    const account = accounts[0];
                    setProfile({
                        id: account.id,
                        email: account.email,
                        firstName: account.firstName,
                        lastName: account.lastName,
                        avatar: account.avatar
                    });
                } else {
                    // setProfile(null);
                }
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                console.error(err);
            });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, loading }}>
            {children}
        </ProfileContext.Provider>
    )
}