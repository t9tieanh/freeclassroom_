const Icon = ({logo, size, onClickFunc}) => {
    return (
        <><img src={logo} className='mr-2' width={size ? size : 35 } onClick={onClickFunc} /></>
    )
}

export default Icon