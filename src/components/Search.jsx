import { Button, Input } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

export default function Search({ onSearch, searchQuery, setSearchQuery }) {
    const handleSearch = () => {
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery.length > 2) {
            onSearch(trimmedQuery);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Input
            style={{ height: '50px', maxHeight: '50px' }}
            size='large'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            suffix={
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Button
                        disabled={searchQuery.trim().length < 2}
                        onClick={() => {
                            setSearchQuery('');
                            onSearch('');
                        }}
                        type='link'
                    >
                        <MdClose size={16} />
                    </Button>
                    <Button
                        disabled={searchQuery.trim().length < 2}
                        onClick={handleSearch}
                        type='primary'
                    >
                        <FaSearch size={16} />
                    </Button>
                </div>
            }
        />
    );
}
