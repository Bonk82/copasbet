import { Box } from "@mui/material"
import Header from "../components/Header"

export const AppLayout = ({children}) => {

  return (
    <Box sx={{ display: 'flex',flexDirection:'column',minHeight:'100vh',justifyContent:'start',backgroundColor:'inherit' }}>
        <Header/>
        <Box component='main' sx={{width:{xs:'100%',md:'80%'},margin:'0 auto'}}>
            { children }
        </Box>
    </Box>
  )
}
