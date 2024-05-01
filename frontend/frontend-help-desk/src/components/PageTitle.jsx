import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types';

const PageTitle = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default PageTitle;