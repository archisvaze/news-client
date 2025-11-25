import { Select } from 'antd';
import { REGION_LIST } from '../location';



export default function RegionPicker({ location, setLocation }) {
    return (
        <Select
            style={{ height: '50px', maxHeight: '50px', width: '25%' }}
            size='large'
            value={location}
            options={REGION_LIST}
            onChange={(value) => setLocation(value)}
        />
    );
}
