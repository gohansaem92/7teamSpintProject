import { Menu, Button as MantineButton } from "@mantine/core";

type DropdownProps = {
  title: string;
  options: { id: string; label: string; action: () => void; active: boolean }[];
};

export default function Dropdown({ title, options }: DropdownProps) {
  return (
    <Menu>
      <Menu.Target>
        <MantineButton color="green.1">{title}</MantineButton>
      </Menu.Target>
      <Menu.Dropdown>
        {options.map((option) => (
          <Menu.Item
            key={option.id}
            onClick={option.action}
            style={(theme) => ({
              backgroundColor: option.active ? theme.colors.gray[1] : "inherit",
              marginBottom: "2px",
            })}
          >
            {option.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
