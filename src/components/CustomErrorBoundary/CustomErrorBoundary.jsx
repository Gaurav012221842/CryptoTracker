import {ErrorBoundary} from 'react-error-boundary'
function CustomErrorBoundaryUI({error,resetErrorBoundary}){
    return(
        <div className='h-[100vh] justify-center items-center px-6 flex'>
            <div role='alert' className='alert alert-error'>
                <h1>Something Went Wrong</h1>
                <div>Error: {error.message}</div>
                <button onClick={resetErrorBoundary}>Try Again</button>
            </div>
        </div>
    )

}
export default function CustomErrorBoundary({children}){
    return(
        <ErrorBoundary FallbackComponent={CustomErrorBoundaryUI}
        onReset={()=>window.location.reload()}>{children}

            
        </ErrorBoundary>
    )
}