'use client';
import { Copy, CopyCheck, CopyX } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';
import { useCallback, useState } from 'react';

export type CopyButtonProps = Omit<ButtonProps, 'children' | 'onClick'> & {
    content: string;
};

type CopyState = 'idle' | 'copied' | 'error';

export function CopyButton({ content, ...buttonProps }: CopyButtonProps) {
    const [copyState, setCopyState] = useState<CopyState>('idle');
    const Icon = Icons[copyState];
    const handleCopy = useCallback(() => {
        navigator.clipboard
            .writeText(content)
            .then(() => {
                setCopyState('copied');
                setTimeout(() => setCopyState('idle'), 2000);
            })
            .catch(() => {
                setCopyState('error');
                setTimeout(() => setCopyState('idle'), 2000);
            });
    }, []);

    return (
        <Button onClick={handleCopy} {...buttonProps}>
            <Icon />
            {CopyMessage[copyState]}
        </Button>
    );
}

const Icons = {
    idle: Copy,
    copied: CopyCheck,
    error: CopyX,
};

const CopyMessage = {
    idle: 'Copy Link',
    copied: 'Copied',
    error: 'Error',
};
