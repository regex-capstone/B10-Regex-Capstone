import { CircularProgress } from '@mui/material'

export default function LoadingSpinner() {
    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </div>
    )
}

