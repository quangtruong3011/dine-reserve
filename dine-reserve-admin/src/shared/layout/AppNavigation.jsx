import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";

const AppNavigation = ({ items, openDrawer }) => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
        openDrawer();
    };

    return (
        <List disablePadding>
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <ListItem sx={{ p: 0 }} onClick={() => handleClick(index)}>
                        <ListItemButton
                            component={Link} to={item?.href}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                            {item.navigationItems ? (openIndex === index ? <ExpandLess /> : <ExpandMore />) : null}
                        </ListItemButton>
                    </ListItem>
                    {item.navigationItems && openIndex === index && (
                        <List disablePadding>
                            {item.navigationItems.map((subItem, subIndex) => (
                                <ListItem key={subIndex} sx={{ pl: 4, py: 0 }}>
                                    <ListItemButton component={Link} to={subItem.href}>
                                        <ListItemText primary={subItem.title} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </React.Fragment>
            ))}
        </List>
    );
};

export default AppNavigation;
