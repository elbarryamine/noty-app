import React, { ReactNode } from "react";
import { useTheme, useColorMode, ThemeProvider } from "@chakra-ui/react";
import { dynamicColors } from "@shared/chakra/theme/colors";

export default function DynamicColorModeProvider(props: { children: ReactNode }) {
    const { colorMode } = useColorMode();
    const theme = useTheme();
    const isDark = colorMode === "dark";

    return (
        <ThemeProvider
            {...props}
            theme={{
                ...theme,
                colors: {
                    ...theme.colors,
                    ...dynamicColors(isDark),
                },
            }}
        />
    );
}
