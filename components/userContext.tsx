"use client";

import UserModel from '@/models/userModel';
import { getUserId } from '@/utils/userAuthenticationApi';
import { getUserDataWithId } from '@/utils/userDataApi';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface UserContextType {
	user: UserModel | null;
}

interface Props {
	children?: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: Props) => {
	const [user, setUser] = useState<UserModel | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			const userId = await getUserId();
			if(userId == null)
				return;

			const user = await getUserDataWithId(userId);
			setUser(user);
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);

	if (!context) 
		throw new Error('useUser must be used within a UserProvider');

	return context;
};
