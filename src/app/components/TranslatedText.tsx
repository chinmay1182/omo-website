"use client"
import React from 'react';

interface TranslatedTextProps {
    text: string;
    className?: string;
    as?: React.ElementType;
    [key: string]: any;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({
    text,
    className,
    as: Component = 'span',
    ...props
}) => {
    return (
        <Component className={className} {...props}>
            {text}
        </Component>
    );
};

export default TranslatedText;
