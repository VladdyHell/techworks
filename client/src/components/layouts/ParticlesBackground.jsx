import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import particlesConfig from "../../config/particles-config";
import { useTheme } from "@material-ui/core";

function ParticlesBackground() {
	const theme = useTheme();
	const particlesInit = async (main) => {
		console.log(main);

		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(main);
	};

	const particlesLoaded = (container) => {
		console.log(container);
	};

	function hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? [
					parseInt(result[1], 16),
					parseInt(result[2], 16),
					parseInt(result[3], 16),
			  ]
			: null;
	}

	return (
		<div
			style={{
				background:
					!eval(localStorage.isDarkMode) &&
					`rgba(${hexToRgb(theme.palette.primary.main)}, 0.2)`,
				position: "absolute",
				width: "100vw",
				height: "100vh",
				// zIndex: -1,
				bottom: 0,
			}}
		>
			<Particles
				id="tsparticles"
				init={particlesInit}
				loaded={particlesLoaded}
				options={particlesConfig(
					eval(localStorage.isDarkMode)
						? theme.palette.primary.main
						: // : theme.palette.secondary.main,
						  theme.palette.secondary.main,
					!eval(localStorage.isDarkMode)
						? // ? theme.palette.primary.main
						  theme.palette.grey[50]
						: theme.palette.grey[900]
				)}
			/>
		</div>
	);
}

export default ParticlesBackground;
