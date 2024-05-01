import { FC, useEffect, useState, useMemo, useRef } from 'react';
import { Button, Card, CardGrid, Group, Headline, List, NavIdProps, Panel, PanelHeader, PanelHeaderBack, Paragraph, Placeholder, Popper, Spacing, Title } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { NewsType } from '../../Types/NewsType';
import { fetchComments, fetchNews } from '../../utils/hackerNewsApi/hackerNewsApi';
import { Link } from '@vkontakte/vkui';
import { convertToData } from '../../utils/Date/convertToData';
import { CommentType } from '../../Types/CommentType';

export const Comments: FC<CommentType> = ({id, text, kids}) => {

    const [ subComments, setSubcommets ] = useState<CommentType[] | null>(null)

    async function toggleSubComments(){
        if(!subComments){
            const res = await fetchComments(kids);
            const data = res.filter(item => !item.deleted);
            setSubcommets(data);
        } else {
            setSubcommets(null);
        }
    }

  return (
    <Group style={{padding:'10px'}}>
    <Card>{text}</Card>
    <Button   onClick={toggleSubComments} style={{marginTop:'10px', marginBottom:'10px'}}>
        {subComments ? 'Скрыть ветку' : 'Развернуть ветку'}
    </Button>
    {subComments && subComments.map(comment => (
        <Group key={comment.id}>
            <Card>{comment.text}</Card>
        </Group>
    ))}
    </Group>
  );
};
