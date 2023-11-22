import Box from '@mui/material/Box';
import { FC } from 'react';

const Questions: FC = () => {

    return( 
        <Box>
            <h2>K: Ne legyen autentikáció. Akkor legyen két endpoint (útvonal) a játékosnak és a játékvezetőnek?</h2>
            <h3>V: Eleinte használtam Routert, de utána "single page"-ként készitettem el. A játékosi és a tulaj felületek a megfelelő gomb megnyomásával érhetők el.</h3>

            <h2>K: Illetve akkor csak egy játékos legyen?</h2>
            <h3>V: Végül egy lett ;)</h3>

            <h2>K: Az elmentett nevet, pénzt, stb elég pl a local storage-ben elmenteni, vagy legyen api hivás és kell egy kis pl node.js backend</h2>
            <h3>V: Végül nincs backend, minden ammi hosszú távú az a local storage-ban van elmentve.</h3>

            
            <h2>K: Új kört indíthat. Ilyenkor a leadott szelvények törlődjenek?</h2>
            <h3>V: Törlődtek. Csak a név és az összegek maradnak meg.</h3>

            <h2>K: Volr egy ilyen elvárás: Az egyes találatokra szelvényenként kifizetendő nyeremény. Ez mit is jelent?</h2>
            <h3>V: Nem sikerült kitalálnom, ezért szerintem nincs ilyen infó, de megnézhetitek.</h3>
        </Box>
        )
}

Questions.displayName = 'Questions';

export default Questions;