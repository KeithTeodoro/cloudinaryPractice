import Header from './Header';
import Button from './Button';

import { useState } from 'react';

export default function Nav() {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			<Header />
			<Button onClick={() => setOpenModal(true)} />
		</>
	);
}
