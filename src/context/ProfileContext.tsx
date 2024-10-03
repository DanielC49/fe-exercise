import { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";

interface ProfileContextType {
    profile: Profile | null;
    loading: boolean;
    setProfile: (value: SetStateAction<Profile | null>) => void;
    getProfile: () => Promise<Profile | null>;
    logout: () => void;
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
    loading: true,
    setProfile: () => { },
    getProfile: async () => { return null },
    logout: () => { }
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<Profile | null>(null);

    /**
     * Fetches the currently logged in profile.
     * @returns A promise containing the profile, an error or null if no login information is in localStorage.
     */
    const getProfile = (): Promise<Profile | null> => {
        return new Promise<Profile | null>((resolve, reject) => {
            const accountId = localStorage.getItem("accountId");
            if (accountId) { // Is logged in
                fetch(`http://localhost:5000/users?id=${accountId}`)
                    .then(res => res.json())
                    .then((accounts: Array<any>) => {
                        if (accounts.length == 1) { // Account exists
                            const account = accounts[0];
                            resolve({
                                id: account.id,
                                email: account.email,
                                firstName: account.firstName,
                                lastName: account.lastName,
                                avatar: account.avatar
                            });
                        } else { // Account doesn't exist
                            reject();
                        }
                    }).catch(err => { // An erorr occurred
                        reject(err);
                    });
            } else { // Not logged in
                resolve(null);
            }
        });
    }

    // Logs out by removing the login info from localStorage.
    const logout = () => {
        localStorage.removeItem("accountId");
        setProfile(null);
        setLoading(false);
    }

    // Load the profile on first render
    useEffect(() => {
        getProfile().then((prof) => {
            setProfile(prof);
            setLoading(false);
        }).catch((err) => {
            setProfile(null);
            setLoading(false);
            console.error(err);
        });
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, loading, setProfile, getProfile, logout }}>
            {children}
        </ProfileContext.Provider>
    )
}