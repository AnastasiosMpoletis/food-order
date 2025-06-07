export default function Success({ modalState, onSuccess }) {
    return (
        <>
            <p>{modalState?.message}</p>
            <div className='modal-actions'>
                <button
                    className='button'
                    onClick={onSuccess}>
                    OK
                </button>
            </div>
        </>
    );
}