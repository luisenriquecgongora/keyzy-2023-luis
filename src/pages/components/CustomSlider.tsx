import { Range } from 'react-range';

interface CustomSliderProps {
    step: number,
    min: number,
    max: number,
    value: number,
    setValue: (x: number) => void
}

const CustomSlider: React.FC<CustomSliderProps> = ({
    step,
    min,
    max,
    value,
    setValue,
}) => {
    return (
        <Range
            step={step}
            min={min}
            max={max}
            values={[value]}
            onChange={(values) => setValue(values[0])}
            renderTrack={({ props, children }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '6px',
                        width: '100%',
                        backgroundColor: '#273043',
                        borderRadius: '2px',
                    }}
                >
                    {children}
                </div>
            )}
            renderThumb={({ props, isDragged }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        height: '16px',
                        width: '16px',
                        borderRadius: '16px',
                        backgroundColor: '#FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '20px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#273043'
                        }}
                    >
                        {value.toFixed(1)}%
                    </div>
                </div>
            )}
        />
    )
}

export default CustomSlider;