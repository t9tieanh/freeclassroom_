const SearchInput = ({className}) => {

    return (
        <>        
            <form className={`career-form mb-60 ${className}`}>
                <div className='row'>
                    <div className='col-md-6 col-lg-3'>
                        <input type='text' className='form-control' placeholder='Enter Your Keywords' id='keywords' />
                    </div>
                    <div className='col-md-6 col-lg-6'>
                        <select className='custom-select'>
                            <option selected>Nhập tên lớp học</option>
                            <option value='1'>Jaipur</option>
                            <option value='2'>Pune</option>
                            <option value='3'>Bangalore</option>
                        </select>
                    </div>
                    <div className='col-md-6 col-lg-3 '>
                        <button type='button' className=' btn btn-block btn-primary '><i class='fa-solid fa-magnifying-glass'></i>&nbsp; Search</button>
                    </div>
                </div>
            </form>   
        </>
    )

}

export default SearchInput;

