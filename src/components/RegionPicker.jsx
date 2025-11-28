import { Select } from 'antd';
import { REGION_LIST } from '../location';

export default function RegionPicker({ location, setLocation }) {
    return (
        <Select
            style={{ height: '50px', maxHeight: '50px', minWidth: '100%', maxWidth: '100%' }}
            size='large'
            value={location}
            options={REGION_LIST}
            onChange={(value) => setLocation(value)}
        />
    );
}
