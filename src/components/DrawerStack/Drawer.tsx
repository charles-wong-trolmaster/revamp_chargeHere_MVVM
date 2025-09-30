import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { useDrawer } from './DrawerStack';

// Types
export interface DrawerProps {
	id: string;
	title?: string;
	widthMultiplier?: number; // Add this line
	children: React.ReactNode;
	onOpen?: () => void;
	onClose?: () => void;
	onTransitionStart?: (isClosing: boolean) => void;
	onTransitionEnd?: (isClosing: boolean) => void;
}

// Context
export const DrawerContext = React.createContext<{
	parentPath: string;
	level: number;
} | null>(null);

// Main Component
const Drawer: React.FC<DrawerProps> = ({ id, widthMultiplier, children, onOpen, onClose, onTransitionStart, onTransitionEnd }) => {
	const { visibleDrawers, closingDrawers, registerDrawer, unregisterDrawer } = useDrawer();
	const parentContext = useContext(DrawerContext);

	// Path calculations
	const level = parentContext ? parentContext.level + 1 : 0;
	const fullPath = parentContext ? `${parentContext.parentPath}/${id}` : id;

	// State tracking refs
	const wasVisibleRef = useRef(false);
	const wasClosingRef = useRef(false);

	// Visibility state
	const isVisible = visibleDrawers.has(fullPath);
	const isClosing = closingDrawers.has(fullPath);

	// Child separation - SIMPLIFIED to avoid hook violations
	const { drawerChildren, content } = useMemo(() => {
		const drawerChildren: React.ReactElement<DrawerProps>[] = [];
		const content: React.ReactNode[] = [];

		React.Children.forEach(children, (child) => {
			if (React.isValidElement(child)) {
				// Simple check: if it looks like a drawer component, treat it as one
				const componentName = (child.type as any)?.displayName || (child.type as any)?.name || '';
				const isDirectDrawer = child.type === Drawer;
				const looksLikeDrawer = componentName.toLowerCase().includes('drawer');

				if (isDirectDrawer || looksLikeDrawer) {
					// Ensure it has proper props structure
					const drawerProps = child.props as any;
					if (drawerProps?.id) {
						drawerChildren.push(child as React.ReactElement<DrawerProps>);
					} else {
						content.push(child);
					}
				} else {
					content.push(child);
				}
			} else {
				content.push(child);
			}
		});

		return { drawerChildren, content };
	}, [children]);

	// Context value
	const contextValue = useMemo(
		() => ({
			parentPath: fullPath,
			level
		}),
		[fullPath, level]
	);

	// Registration effect
	useEffect(() => {
		registerDrawer(fullPath, content, widthMultiplier); // Pass widthMultiplier
		return () => unregisterDrawer(fullPath);
	}, [fullPath, content, widthMultiplier, registerDrawer, unregisterDrawer]); // Add widthMultiplier to deps

	// Lifecycle callbacks
	useEffect(() => {
		if (isVisible && !isClosing && onOpen) {
			onOpen();
		}
	}, [isVisible, isClosing, onOpen]);

	useEffect(() => {
		if (isClosing && onClose) {
			onClose();
		}
	}, [isClosing, onClose]);

	// Transition start callback
	useEffect(() => {
		if ((isVisible || isClosing) && onTransitionStart) {
			onTransitionStart(isClosing);
		}
	}, [isVisible, isClosing, onTransitionStart]);

	// Transition end callback
	useEffect(() => {
		const wasVisible = wasVisibleRef.current;
		const wasClosingState = wasClosingRef.current;

		// Update refs
		wasVisibleRef.current = isVisible;
		wasClosingRef.current = isClosing;

		// Detect transition completion
		const transitionEnded =
			(!wasVisible && isVisible && !isClosing) || // Opening complete
			(wasClosingState && !isVisible && !isClosing); // Closing complete

		if (transitionEnded && onTransitionEnd) {
			const wasClosingTransition = wasClosingState && !isVisible;
			onTransitionEnd(wasClosingTransition);
		}
	}, [isVisible, isClosing, onTransitionEnd]);

	return (
		<DrawerContext.Provider value={contextValue}>
			{drawerChildren.map((child, index) => (
				<React.Fragment key={child.props.id || index}>{child}</React.Fragment>
			))}
		</DrawerContext.Provider>
	);
};

export default Drawer;
