import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './camera-toggle.css';

/**
 * The camera button that sits beside the flag and the stop sign.
 *
 * Its icon is drawn here rather than loaded from a .svg file the way its two
 * neighbours' are, for two reasons. The body and the slash have to recolour
 * together when the camera goes off, which an <img> cannot be told to do; and
 * patch-package diffs without --binary, so an .svg carried in the patch would
 * arrive as an empty file and the button would have no picture at all.
 * @param {object} props - on, onClick, title, and anything to pass through.
 * @returns {React.Element} - the button.
 */
const CameraToggleComponent = function (props) {
    const {
        className,
        on,
        onClick,
        title,
        ...componentProps
    } = props;
    return (
        <div
            className={classNames(
                className,
                styles.cameraToggle,
                {
                    [styles.isOn]: on
                }
            )}
            title={title}
            onClick={onClick}
            {...componentProps}
        >
            <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <rect
                    height="12"
                    rx="2.5"
                    width="13"
                    x="2"
                    y="6"
                />
                <path d="M15 11 L21 7.5 L21 16.5 L15 13 Z" />
                {on ? null : (
                    <path d="M3.5 20.5 L20.5 3.5" />
                )}
            </svg>
        </div>
    );
};

CameraToggleComponent.propTypes = {
    className: PropTypes.string,
    on: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string
};

CameraToggleComponent.defaultProps = {
    on: false,
    title: 'Camera'
};

export default CameraToggleComponent;
