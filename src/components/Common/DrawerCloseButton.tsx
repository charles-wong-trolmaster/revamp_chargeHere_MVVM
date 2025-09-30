import React from 'react';
import { useDrawer } from '../DrawerStack/DrawerStack';

interface DrawerCloseButtonProps {
	drawerId: string;
}

const DrawerCloseButton: React.FC<DrawerCloseButtonProps> = ({ drawerId }) => {
	const { closeDrawer } = useDrawer();

	const handleClose = () => {
		closeDrawer(drawerId);
	};

	return (
		<button className="close" onClick={handleClose}>
			×
		</button>
	);
};

export default DrawerCloseButton;
