import React,{useCallback} from 'react'
import { Dimensions } from 'react-native'

export default function Orientation() {
    
        const handleOrientation = useCallback(() => {
            const { width, height } = Dimensions.get('window')
            console.log(width, height);
        }, []);
        React.useEffect(() => {
            Dimensions.addEventListener('change', handleOrientation);
            return () => {
                Dimensions.removeEventListener('change', handleOrientation)
            }
        }, [handleOrientation])
    return {};
    }
    

