const DropDown = (props) => {

    return (
        <div className="dropdown">
            {
                props.data.map(item => (
                    <span>{item}</span>
                ))
            }
        </div>
    );
}

export default DropDown;