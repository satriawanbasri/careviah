import { useContext } from 'react'
import Modal from 'react-modal'
import { HashLoader } from 'react-spinners'
import { IsShowLoadingContext } from '../../utils/contexts'

Modal.setAppElement('#root')

export default () => {
    const { isShowLoading, setIsShowLoading } = useContext(IsShowLoadingContext)

    return (
        <Modal
            isOpen={isShowLoading}
            onRequestClose={() => setIsShowLoading(false)}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 10002
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    padding: '40px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: 'transparent'
                }
            }}>
            <HashLoader color="silver" loading={true} size={60} />
        </Modal>
    )
}
