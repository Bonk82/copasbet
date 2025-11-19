import { Box } from "@mui/material"
import Header from "../components/Header"

export const AppLayout = ({children}) => {

  return (
    <Box sx={{ display: 'flex'}}>
        <Header/>
        <Box component='main' sx={{width:{xs:'100%',md:'80%'},justifyContent:'center'}}>
            { children }
        </Box>
    </Box>
  )
}
