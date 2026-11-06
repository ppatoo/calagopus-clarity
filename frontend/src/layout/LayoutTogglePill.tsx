import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useState } from "react";
import LayoutModal from "./LayoutModal.tsx";

export default function LayoutTogglePill() {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<div className="fixed bottom-4 right-4 z-40 hidden sm:block">
				<Tooltip label="Clarity Layout Studio" position="left" withArrow>
					<ActionIcon
						variant="filled"
						color="cyan"
						size="lg"
						radius="xl"
						onClick={() => setModalOpen(true)}
						className="shadow-lg hover:scale-105 transition-transform"
					>
						<FontAwesomeIcon icon={faSliders} />
					</ActionIcon>
				</Tooltip>
			</div>

			<LayoutModal opened={modalOpen} onClose={() => setModalOpen(false)} />
		</>
	);
}
