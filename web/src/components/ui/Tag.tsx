import "../../styles/components/tag.css";

interface TagProps {
  label: string;
}

function Tag({ label }: TagProps) {
  return <span className="tag">{label}</span>;
}

interface TagListProps {
  tags: string[];
}

function TagList({ tags }: TagListProps) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <Tag key={tag} label={tag} />
      ))}
    </div>
  );
}

export { Tag, TagList };
