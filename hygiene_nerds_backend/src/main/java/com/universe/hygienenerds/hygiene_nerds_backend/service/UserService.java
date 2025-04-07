package com.universe.hygienenerds.hygiene_nerds_backend.service;

import com.universe.hygienenerds.hygiene_nerds_backend.dao.UserDao;
import com.universe.hygienenerds.hygiene_nerds_backend.dto.UserTypes;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.Admin;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.Customer;
import com.universe.hygienenerds.hygiene_nerds_backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;

    public String updateUserProfileUrl(String username, String filename) {
        User user = userDao.findByUsername(username).orElse(null);
        if (user == null) {
            return "user doesn't exist";
        }

        user.setImageUrl(filename);
        userDao.save(user);
        return filename;
    }

    public UserTypes.UserDto getUserDetails(String userName) {
        User user = userDao.findByUsername(userName).orElse(null);
        return switch (user) {
            case null -> null;
            case Admin admin -> new UserTypes.AdminDto(
                    admin.getFirstName(),
                    admin.getLastName(),
                    admin.getUsername(),
                    admin.getPassword(),
                    admin.getEmail(),
                    admin.getPhoneNumber(),
                    admin.getDepartment(),
                    admin.getImageUrl()
            );
            case Customer customer -> new UserTypes.CustomerDto(
                    customer.getFirstName(),
                    customer.getLastName(),
                    customer.getUsername(),
                    customer.getPassword(),
                    customer.getEmail(),
                    customer.getPhoneNumber(),
                    customer.getAddress(),
                    customer.getImageUrl()
                    );
            default ->
                    new UserTypes.BasicUserDto(
                            user.getFirstName(),
                            user.getLastName(),
                            user.getUsername(),
                            user.getImageUrl(),
                            user.getPassword(),
                            user.getEmail(),
                            user.getPhoneNumber()
                    );
        };

    }
}