

export default function Radio(props){
    return (
        <>
            <div className="flex gap-2 sm:gap-3 items-center">
                  <input
                    type="radio"
                    name={props.radioName}
                    id={props.radioId}
                    value={props.value}
                    className="radio focus:border-none cursor-pointer"
                    onChange={props.onChange}
                    
                  />
                  <label
                    htmlFor={props.radioId}
                    className="font-medium text-base sm:text-lg cursor-pointer"
                  >
                    {props.displayText}
                  </label>
                </div>
        </>
    )
}
