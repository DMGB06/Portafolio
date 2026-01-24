"use client"

//Importamos themProvider de next-themes y lo renombramos como NextThemesProvider
import { ThemeProvider as NextThemesProvider } from "next-themes"

//Imporatmos el ThemeProps es decir las propiedades que se va a recibir
import { type ThemeProviderProps } from "next-themes"

export function ThemeProvider({children, ...props}: ThemeProviderProps ){
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}